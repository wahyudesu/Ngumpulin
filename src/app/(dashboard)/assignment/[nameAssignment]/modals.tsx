import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { PenSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { updateDocumentGrade } from "@/actions/update-grade";
import { updateDocumentFeedback, generateAIFeedback } from "@/actions/update-feedback";

const GradeEditModal = ({ document, onSave, onSendEmail }: { document: any, onSave: any, onSendEmail: any }) => {
    const [open, setOpen] = useState(false);
    const [grade, setGrade] = useState(document.grade || "");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const handleSave = () => {
        if (!grade || parseFloat(grade) < 0 || parseFloat(grade) > 100) {
            setError("Nilai harus antara 0-100");
            return;
        }

        startTransition(async () => {
            try {
                const result = await updateDocumentGrade(document.id, parseFloat(grade));
                
                if (result.success) {
                    onSave(document.id, parseFloat(grade));
                    setOpen(false);
                    setError("");
                } else {
                    setError(result.error || "Gagal menyimpan nilai");
                }
            } catch (error) {
                setError("Terjadi kesalahan saat menyimpan nilai");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="w-full">
                    {/* <PenSquare className="mr-2 h-4 w-4" /> */}
                    {document.grade || "Input Nilai"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Input Nilai</DialogTitle>
                    <DialogDescription>
                        Masukkan nilai untuk {document.nameStudent}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="grade" className="text-right">
                            Nilai
                        </Label>
                        <Input
                            id="grade"
                            type="number"
                            min="0"
                            max="100"
                            value={grade}
                            onChange={(e) => {
                                setGrade(e.target.value);
                                setError("");
                            }}
                            className="col-span-3"
                            disabled={isPending}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button 
                        type="submit" 
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? "Menyimpan..." : "Simpan Nilai"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const FeedbackEditModal = ({ document, onSave, onSendEmail }: { document: any, onSave: any, onSendEmail: any }) => {
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState(document.feedback || "");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSave = () => {
        if (!feedback.trim()) {
            setError("Feedback tidak boleh kosong");
            return;
        }

        startTransition(async () => {
            try {
                const result = await updateDocumentFeedback(document.id, feedback);
                
                if (result.success) {
                    onSave(document.id, feedback);
                    setOpen(false);
                    setError("");
                } else {
                    setError(result.error || "Gagal menyimpan feedback");
                }
            } catch (error) {
                setError("Terjadi kesalahan saat menyimpan feedback");
            }
        });
    };

    const handleGenerateAI = async () => {
        setIsGenerating(true);
        setError("");
        
        try {
            const result = await generateAIFeedback(document);
            
            if (result.success) {
                setFeedback(result.feedback);
                onSave(document.id, result.feedback);
                // Don't close modal so user can review and edit the generated feedback
            } else {
                setError(result.error || "Gagal menghasilkan feedback AI");
            }
        } catch (error) {
            setError("Terjadi kesalahan saat menghasilkan feedback AI");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSendEmail = () => {
        onSendEmail(document.id, `Feedback: ${feedback}`);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full ">
                    {document.feedback ? "Edit Feedback" : "Generate Feedback"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="">Feedback Tugas</DialogTitle>
                    <DialogDescription>
                        Berikan feedback untuk tugas {document.nameStudent}
                    </DialogDescription>
                </DialogHeader>                <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="feedback">
                            Feedback
                        </Label>
                        <Textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => {
                                setFeedback(e.target.value);
                                setError("");
                            }}
                            placeholder="Masukkan feedback..."
                            className="h-32"
                            disabled={isPending || isGenerating}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button 
                        variant="outline" 
                        type="button" 
                        onClick={handleGenerateAI}
                        disabled={isPending || isGenerating}
                    >
                        {isGenerating ? "Menghasilkan..." : "AI Generate Feedback"}
                    </Button>
                    <Button 
                        type="button" 
                        onClick={handleSave}
                        disabled={isPending || isGenerating}
                    >
                        {isPending ? "Menyimpan..." : "Simpan"}
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={handleSendEmail}
                        disabled={!feedback.trim() || isPending || isGenerating}
                    >
                        Kirim ke Email
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { FeedbackEditModal, GradeEditModal };