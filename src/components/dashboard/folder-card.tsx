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
  assignmentType: string | null;
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
              <Badge className="rounded-lg py-1 bg-violet-700/40">2 SDT B</Badge>
              <Badge className="rounded-lg py-1 bg-violet-700/40">2 IT B</Badge>
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
            <div className="text-black/70 text-sm tracking-tight line-clamp-3">
              {assignment.description}
            </div>
          </CardBody>
          <CardFooter className="justify-between gap-2">
            <Badge className="text-xs rounded-md bg-white border-black/40 text-black tracking-tight font-light hover:text-white shadow-sm">
              {assignment.dueDate
                ? new Date(assignment.dueDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "N/A"}
            </Badge>
            <div className="flex gap-2">
              <Badge className="gap-1 rounded-lg bg-white border-gray-200 text-black/80 border px-1">
                <Paperclip size={12} />
                2
              </Badge>
              <Badge className="gap-1 rounded-lg bg-white border-gray-200 text-black/80 border px-1">
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
