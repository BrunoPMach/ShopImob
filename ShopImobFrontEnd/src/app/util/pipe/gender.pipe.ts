import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'genderPipe' })
export class GenderPipe implements PipeTransform {
  transform(gender: string): string {
    return gender === "M" ? "Masculino" : "Feminino";
  }
}