import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { classes } from '@/server/db/schema';

export async function GET() {
  try {
    const classData = await db.select({
      id: classes.id,
      className: classes.className,
    }).from(classes);

    return NextResponse.json(classData);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
}
