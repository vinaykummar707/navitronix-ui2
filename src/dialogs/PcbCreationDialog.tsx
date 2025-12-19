import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PcbCreationForm from "@/forms/PcbCreationForm"
import { Plus } from "lucide-react"

export default function PcbCreationDialog() {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <Plus/>
            Add PCB</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-secondary/50">
          <DialogHeader>
            <DialogTitle>New PCB Creation</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
         <PcbCreationForm/>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" variant="outline">Cancel</Button>
            </DialogClose>
            {/* <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
