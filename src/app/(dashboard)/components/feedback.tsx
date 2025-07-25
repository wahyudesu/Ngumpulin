"use client";

import { useState } from "react"; // ✅ modified
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function FeedbackCard() {
  const [openForm, setOpenForm] = useState(false); // ✅ modified
  const [openThanks, setOpenThanks] = useState(false); // ✅ modified

  const handleSubmit = () => {
    setOpenForm(false); // tutup form dialog
    setTimeout(() => setOpenThanks(true), 300); // buka thanks dialog
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-center">Kirim Masukan</CardTitle>
        <CardDescription className="text-center">
          Kami butuh masukanmu.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {/* Form Dialog */}
        <Dialog open={openForm} onOpenChange={setOpenForm}> {/* ✅ modified */}
          <DialogTrigger asChild>
            <Button variant="outline">Berikan Feedback</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5">
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b border-border px-6 py-4 text-base">
                Bantu kami berkembang
              </DialogTitle>
            </DialogHeader>
            <div className="px-6 py-4">
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}> {/* ✅ modified */}
                <div className="space-y-6">
                  {/* Pertanyaan 1 */}
                  <div>
                    <fieldset className="space-y-4">
                      <legend className="text-lg font-semibold leading-none text-foreground">
                        Seberapa mudah menggunakan platform ini?
                      </legend>
                      <RadioGroup className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                          <label
                            key={number}
                            className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                          >
                            <RadioGroupItem
                              id={`ease-${number}`}
                              value={number.toString()}
                              className="sr-only after:absolute after:inset-0"
                            />
                            {number}
                          </label>
                        ))}
                      </RadioGroup>
                    </fieldset>
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <p>Sangat sulit</p>
                      <p>Sangat mudah</p>
                    </div>
                  </div>

                  {/* Pertanyaan 2 */}
                  <div>
                    <fieldset className="space-y-4">
                      <legend className="text-lg font-semibold leading-none text-foreground">
                        Seberapa berguna fitur-fitur yang tersedia?
                      </legend>
                      <RadioGroup className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                          <label
                            key={number}
                            className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                          >
                            <RadioGroupItem
                              id={`usefulness-${number}`}
                              value={number.toString()}
                              className="sr-only after:absolute after:inset-0"
                            />
                            {number}
                          </label>
                        ))}
                      </RadioGroup>
                    </fieldset>
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <p>Tidak berguna</p>
                      <p>Sangat berguna</p>
                    </div>
                  </div>

                  {/* Textarea */}
                  <div className="space-y-2">
                    <Label>Mengapa Anda memberikan penilaian tersebut?</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Bagaimana kami bisa meningkatkan platform ini?"
                      aria-label="Kirim feedback"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Kirim feedback
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Terima kasih Dialog */}
        <Dialog open={openThanks} onOpenChange={setOpenThanks}> {/* ✅ modified */}
          <DialogContent className="text-center">
            <DialogHeader>
              <DialogTitle>Terima kasih atas responnya! 🙏</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
