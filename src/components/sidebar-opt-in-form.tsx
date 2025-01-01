import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react"
import { SidebarInput } from "@/components/ui/sidebar"

export function SidebarOptInForm() {
  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Limit of your task</CardTitle>
          <CardDescription>
            3 of 5 project created
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <SidebarInput type="email" placeholder="Email" />
          <Button
            className="w-full shadow-none"
            size="sm"
          >
            Subscribe
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
