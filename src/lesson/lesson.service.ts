import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Lesson } from './lesson.entity';
import { AssignStudentInput, CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private repository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.repository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.repository.findOne({ id });
  }

  async createLesson(input: CreateLessonInput): Promise<Lesson> {
    const lesson = this.repository.create({
      id: uuid(),
      name: input.name,
      startDate: input.startDate,
      endDate: input.endDate,
      students: input.students,
    });

    return this.repository.save(lesson);
  }

  async assignStudent(input: AssignStudentInput): Promise<any> {
    const lesson = await this.repository.findOne({ id: input.lessonId });

    lesson.students = [...lesson.students, ...input.studentId];

    return this.repository.save(lesson);
  }
}
