import React, { useMemo, useRef, useEffect, useCallback } from "react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type MarqueeDirection = "none" | "ltr" | "rtl";
type Alignment = "start" | "center" | "end";

interface LEDMatrixProps {
  rows: number;
  columns: number;
  pattern?: string[];
  dotSize?: number;
  dotSpacing?: number;
  onColor?: string;
  offColor?: string;
  marqueeDirection?: MarqueeDirection;
  scrollSpeed?: number;
  alignment?: Alignment;
  paused?: boolean;
  onPatternChange?: (pattern: boolean[][]) => void;
  interactive?: boolean;
  gapAfterPattern?: number;
}

interface DotSprites {
  on: HTMLCanvasElement;
  off: HTMLCanvasElement;
}

interface RenderConfig {
  totalDotSize: number;
  canvasWidth: number;
  canvasHeight: number;
  patternWidth: number;
  patternHeight: number;
  staticOffsetX: number;
  startY: number;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates an offscreen canvas with a pre-rendered dot sprite
 * This dramatically improves performance by avoiding arc() calls [web:9][web:36]
 */
const createDotSprite = (size: number, color: string): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d", { alpha: true });

  if (ctx) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  return canvas;
};

/**
 * Converts string pattern to boolean matrix
 */
const parsePattern = (pattern: string[]): boolean[][] => {
  return pattern.map(row => row.split("").map(char => char === "#"));
};

/**
 * Creates empty matrix
 */
const createEmptyMatrix = (rows: number, columns: number): boolean[][] => {
  return Array.from({ length: rows }, () => Array(columns).fill(false));
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Hook to manage dot sprites with proper memoization [web:31][web:33]
 */
const useDotSprites = (dotSize: number, onColor: string, offColor: string): DotSprites | null => {
  return useMemo(() => {
    return {
      on: createDotSprite(dotSize, onColor),
      off: createDotSprite(dotSize, offColor),
    };
  }, [dotSize, onColor, offColor]);
};

/**
 * Hook to compute render configuration [web:34]
 */
const useRenderConfig = (
  matrix: boolean[][],
  rows: number,
  columns: number,
  dotSize: number,
  dotSpacing: number,
  marqueeDirection: MarqueeDirection,
  alignment: Alignment
): RenderConfig => {
  return useMemo(() => {
    const totalDotSize = dotSize + dotSpacing;
    const canvasWidth = columns * totalDotSize;
    const canvasHeight = rows * totalDotSize;
    const patternWidth = (matrix[0]?.length || 0) * totalDotSize;
    const patternHeight = matrix.length;

    // Calculate static alignment offset
    let staticOffsetX = 0;
    if (marqueeDirection === "none" && patternWidth < canvasWidth) {
      switch (alignment) {
        case "center":
          staticOffsetX = Math.floor((canvasWidth - patternWidth) / 2);
          break;
        case "end":
          staticOffsetX = canvasWidth - patternWidth;
          break;
      }
    }

    const startY = Math.floor((rows - patternHeight) / 2) * totalDotSize;

    return {
      totalDotSize,
      canvasWidth,
      canvasHeight,
      patternWidth,
      patternHeight,
      staticOffsetX,
      startY,
    };
  }, [matrix, rows, columns, dotSize, dotSpacing, marqueeDirection, alignment]);
};

// ============================================================================
// RENDERER CLASS
// ============================================================================

/**
 * Encapsulated renderer for better separation of concerns [web:32][web:34]
 * Uses batch rendering techniques for optimal performance [web:9][web:36]
 */
class LEDMatrixRenderer {
  private ctx: CanvasRenderingContext2D;
  private sprites: DotSprites;
  private config: RenderConfig;

  constructor(ctx: CanvasRenderingContext2D, sprites: DotSprites, config: RenderConfig) {
    this.ctx = ctx;
    this.sprites = sprites;
    this.config = config;
  }

  /**
   * Renders the matrix with optimized batched drawing [web:9]
   */
  render(matrix: boolean[][], scrollOffset: number, isMarquee: boolean): void {
    const { ctx, sprites, config } = this;
    const { canvasWidth, canvasHeight, totalDotSize, patternWidth, startY, staticOffsetX } = config;

    // Clear canvas with solid background (alpha: false optimization)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const offsetX = isMarquee ? scrollOffset : staticOffsetX;

    // Batch render all dots
    matrix.forEach((row, rowIdx) => {
      const y = rowIdx * totalDotSize + startY;

      row.forEach((isOn, colIdx) => {
        const baseX = colIdx * totalDotSize;
        const sprite = isOn ? sprites.on : sprites.off;

        if (!isMarquee) {
          // Static rendering
          this.drawDot(sprite, baseX + offsetX, y, canvasWidth);
        } else {
          // Marquee rendering with seamless wrapping
          this.drawMarqueeDot(sprite, baseX, offsetX, y, patternWidth, canvasWidth);
        }
      });
    });
  }

  /**
   * Draws a single dot with bounds checking
   */
  private drawDot(sprite: HTMLCanvasElement, x: number, y: number, canvasWidth: number): void {
    if (x >= -sprite.width && x <= canvasWidth) {
      this.ctx.drawImage(sprite, x, y);
    }
  }

  /**
   * Draws marquee dot with wrapping logic for seamless scrolling
   */
  private drawMarqueeDot(
    sprite: HTMLCanvasElement,
    baseX: number,
    offset: number,
    y: number,
    patternWidth: number,
    canvasWidth: number
  ): void {
    let x = baseX + offset;

    // Normalize to pattern width for seamless looping
    x = ((x % patternWidth) + patternWidth) % patternWidth;

    // Draw primary instance
    this.drawDot(sprite, x, y, canvasWidth);

    // Draw wrapped instance for continuous scroll
    const wrappedX = x - patternWidth;
    if (wrappedX + sprite.width >= 0) {
      this.drawDot(sprite, wrappedX, y, canvasWidth);
    }

    // Fill gaps if pattern is smaller than canvas
    if (patternWidth < canvasWidth) {
      const wrappedX2 = x + patternWidth;
      if (wrappedX2 < canvasWidth) {
        this.drawDot(sprite, wrappedX2, y, canvasWidth);
      }
    }
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const LEDMatrix: React.FC<LEDMatrixProps> = ({
  rows,
  columns,
  pattern,
  dotSize = 3,
  dotSpacing = 3,
  onColor = "#ffbf00",
  offColor = "#000000ff",
  marqueeDirection = "rtl",
  scrollSpeed = 10,
  alignment = "start",
  paused = false,
  onPatternChange,
  interactive = true,
  gapAfterPattern = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollPosRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

 // Parse or create matrix with gap padding
  const matrix = useMemo(() => {
    const validRows = Math.max(1, rows);
    const validColumns = Math.max(1, columns);

    let baseMatrix: boolean[][];
    
    if (pattern?.length) {
      baseMatrix = parsePattern(pattern);
    } else {
      baseMatrix = createEmptyMatrix(validRows, validColumns);
    }

    // Add gap columns after the pattern [web:41]
    if (gapAfterPattern > 0 && marqueeDirection !== "none") {
      return baseMatrix.map(row => [
        ...row,
        ...Array(gapAfterPattern).fill(false) // Add empty columns for gap
      ]);
    }

    return baseMatrix;
  }, [rows, columns, pattern, gapAfterPattern, marqueeDirection]);

  // Pre-rendered dot sprites
  const sprites = useDotSprites(dotSize, onColor, offColor);

  // Computed render configuration
  const config = useRenderConfig(matrix, rows, columns, dotSize, dotSpacing, marqueeDirection, alignment);

  // ============================================================================
  // ANIMATION LOOP
  // ============================================================================

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sprites) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Performance optimization
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = config.canvasWidth;
    canvas.height = config.canvasHeight;

    // Initialize renderer
    const renderer = new LEDMatrixRenderer(ctx, sprites, config);
    const isMarquee = marqueeDirection !== "none";

    /**
     * Animation loop with delta time for consistent speed [web:27]
     */
    const animate = (timestamp: number): void => {
      const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 0;
      lastTimeRef.current = timestamp;

      // Update scroll position based on delta time
      if (!paused && isMarquee) {
        const pixelsPerSecond = scrollSpeed * 30;
        const movement = (pixelsPerSecond * deltaTime) / 1000;

        if (marqueeDirection === "ltr") {
          scrollPosRef.current += movement;
          if (scrollPosRef.current >= config.patternWidth) {
            scrollPosRef.current -= config.patternWidth;
          }
        } else {
          scrollPosRef.current -= movement;
          if (scrollPosRef.current <= -config.patternWidth) {
            scrollPosRef.current += config.patternWidth;
          }
        }
      }

      // Render frame
      renderer.render(matrix, scrollPosRef.current, isMarquee);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [matrix, sprites, config, marqueeDirection, scrollSpeed, paused]);

  // ============================================================================
  // INTERACTION HANDLER
  // ============================================================================

  /**
   * Handle canvas click to toggle LED state [web:34][web:35]
   */
  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>): void => {
      if (!interactive || marqueeDirection !== "none" || !onPatternChange) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const col = Math.floor(x / config.totalDotSize);
      const row = Math.floor(y / config.totalDotSize);

      if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
        const newMatrix = matrix.map((r, i) =>
          i === row ? r.map((cell, j) => (j === col ? !cell : cell)) : r
        );
        onPatternChange(newMatrix);
      }
    },
    [interactive, marqueeDirection, onPatternChange, config.totalDotSize, matrix]
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{
        backgroundColor: "#141414",
        display: "block",
        cursor: interactive && marqueeDirection === "none" ? "pointer" : "default",
      }}
      aria-label="LED Matrix Display"
    />
  );
};

export default LEDMatrix;
