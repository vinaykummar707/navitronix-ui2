// Returns the number of columns (width) of a bitmap string
export function getBitmapColumns(bitmap: string): number {
    if (bitmap) {
      const lines = bitmap.trim().split("\n");
      return lines.length > 0 ? lines[0].length : 0;
    }
    return 0;
  }
  
  // Returns the height (number of rows) of a bitmap string
  export function getBitmapHeight(bitmap: string): number {
    if (bitmap) {
      const lines = bitmap.trim().split("\n");
      return lines.length;
    }
    return 0;
  }
  
  // If you expect more cases later, keep getFormatByScreen.
  // Otherwise, it's redundant (always returns cols).
  function getFormatByScreen(cols: number, format: string): number {
    // Future logic can go here based on format, for now just returns cols.
    return cols;
  }
  
  // Returns the number of columns for each board type and format
  export function getColumnsByBoard(
    boardType: "front" | "side" | "rear" | string,
    format: string,
    frontBoardCols: number = 112 // allow passing this or default to 112
  ): number {
    switch (boardType) {
      case "front":
        return getFormatByScreen(frontBoardCols, format);
      case "side":
        return getFormatByScreen(96, format);
      case "rear":
        return getFormatByScreen(96, format);
      default:
        return getFormatByScreen(112, format);
    }
  }