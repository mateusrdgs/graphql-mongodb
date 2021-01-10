import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CreateStudentInput } from './student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private repository: Repository<Student>,
  ) {}

  async getStudents(ids?: string[]): Promise<Student[]> {
    if (Array.isArray(ids)) {
      return this.repository.find({
        where: {
          id: {
            $in: ids,
          },
        },
      });
    }

    return this.repository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.repository.findOne({ id });
  }

  async create(input: CreateStudentInput): Promise<Student> {
    const student = this.repository.create({
      id: uuid(),
      firstName: input.firstName,
      lastName: input.lastName,
    });

    return this.repository.save(student);
  }
}
