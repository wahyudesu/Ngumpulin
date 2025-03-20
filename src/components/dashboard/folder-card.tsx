"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Pencil, User2 } from "lucide-react";
import { getDataAssignment } from "@/actions/getassignment";
import UpdateAssignmentFolder from "./update-assignment";
import Link from "next/link";

interface Folder {
  id: number;
  nameAssignment: string;
  createdAt: Date | null;
  dueDate: Date | null;
  className: string | null;
  description: string | null;
}

const AssignmentFolders = () => {
  const [assignments, setAssignments] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await getDataAssignment();
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
      {assignments.map((assignment) => (
        <Card
          key={assignment.id}
          className="hover:shadow-lg transition-shadow border rounded-xl p-4 gap-2"
        >
          <CardHeader className="flex justify-between">
            <div className="gap-2 flex justify-start">
              <Badge className="rounded-lg py-1 bg-secondary text-primary hover:text-white">2 SDT B</Badge>
              <Badge className="rounded-lg py-1 bg-secondary text-primary hover:text-white">2 IT B</Badge>
            </div>
            <div className="flex justify-start">
              <UpdateAssignmentFolder id={assignment.id}/>
            </div>
          </CardHeader>
          <CardBody className="space-y-1 mb-2">
            <div className="text-xl hover:underline mt-1">
              <Link
                href={`/assignment/${assignment.nameAssignment}`}
              >
                {assignment.nameAssignment}
              </Link>
            </div>
            <div className="opacity-75 text-sm tracking-tight line-clamp-3">
              {assignment.description}
            </div>
          </CardBody>
          <CardFooter className="justify-between gap-2">
            <Badge variant="outline" className="border tracking-tight font-light hover:bg-black/10 shadow-sm">
              {assignment.dueDate
                ? new Date(assignment.dueDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "N/A"}
            </Badge>
            <div className="flex gap-2">
              <Badge variant ="secondary" className="gap-1 rounded-lg border-gray-200 border px-1">
                <Paperclip size={12} />
                2
              </Badge>
              <Badge variant ="secondary" className="gap-1 rounded-lg border-gray-200 border px-1">
                <User2 size={12} />
                2
              </Badge>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AssignmentFolders;
