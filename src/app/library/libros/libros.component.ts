import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from 'src/app/model/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {
  @ViewChild('formModal') modalRef: any;
  libros: Libro[] = [];
  formMode?: string;

  constructor(private libroService: LibroService) { }

  ngOnInit() {
    this.loadLibros();
  }

  loadLibros() {
    this.libroService.list().subscribe({
      next: (value: Libro[]) => {
        this.libros = value;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => { }
    });
  }

  deleteLibro(libro: Libro) {
    if (libro.isbn != null) {
      this.libroService.delete(libro.isbn).subscribe({
        next: (response: any) => {
          console.log('Libro eliminado');
          this.loadLibros();
        },
        error: (error: any) => {
          console.log('Error al eliminar libro', error);
        },
        complete: () => { }
      });
    }
  }

  closeModal() {
    this.loadLibros();
  }
}
