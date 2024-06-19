import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { catchError } from 'rxjs/operators'; // Import operator catchError dari RxJS
import { throwError } from 'rxjs'; // Import fungsi throwError dari RxJS

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Daftar file stylesheet untuk komponen
})

export class AppComponent implements OnInit {
  posts: any[] = []; // Inisialisasi array untuk menyimpan data postingan

  constructor(private apiService: ApiService) { } // Konstruktor dengan injeksi ApiService

  ngOnInit(): void {
    this.getPosts(); // Memanggil metode untuk mendapatkan postingan saat komponen diinisialisasi
    this.createPost(); // Memanggil metode untuk membuat postingan
    this.updatePost(); // Memanggil metode untuk memperbarui postingan
    this.patchPost(); // Memanggil metode untuk mengganti bagian dari postingan
    this.deletePost(); // Memanggil metode untuk menghapus postingan
  }

  // Metode untuk mendapatkan daftar postingan dari API
  getPosts(): void {
    this.apiService.getPosts().pipe(
      catchError(error => {
        console.error('Error fetching posts:', error); // Log jika terjadi kesalahan dalam mendapatkan postingan
        // Lakukan penanganan kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
        return throwError(error); // Teruskan kesalahan ke tingkat yang lebih tinggi
      })
    ).subscribe(data => {
      console.log('GET request:', data); // Log data postingan yang berhasil didapatkan dari API
      this.posts = data; // Memperbarui array posts dengan data yang didapatkan
    });
  }

  // Metode untuk membuat postingan baru ke API
  createPost(): void {
    const newPost = { title: 'foo', body: 'bar', userId: 1 };
    this.apiService.createPost(newPost).subscribe(data => {
      console.log('POST request:', data); // Log data respons dari permintaan pembuatan postingan
    });
  }

  // Metode untuk memperbarui postingan di API berdasarkan ID
  updatePost(): void {
    const updatedPost = { id: 1, title: 'foo', body: 'bar', userId: 1 };
    this.apiService.updatePost(1, updatedPost).subscribe(data => {
      console.log('PUT request:', data); // Log data respons dari permintaan pembaruan postingan
    });
  }

  // Metode untuk mengganti bagian dari postingan di API berdasarkan ID
  patchPost(): void {
    const patchedPost = { title: 'foo' };
    this.apiService.patchPost(1, patchedPost).subscribe(data => {
      console.log('PATCH request:', data); // Log data respons dari permintaan penggantian bagian postingan
    });
  }

  // Metode untuk menghapus postingan di API berdasarkan ID
  deletePost(): void {
    this.apiService.deletePost(1).subscribe(data => {
      console.log('DELETE request:', data); // Log data respons dari permintaan penghapusan postingan
    });
  }
}
