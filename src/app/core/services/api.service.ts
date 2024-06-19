import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import modul HttpClient untuk request HTTP
import { Observable } from 'rxjs'; // Import Observable dari RxJS untuk mengelola aliran data asinkron

@Injectable({
  providedIn: 'root' // Deklarasi layanan sebagai layanan root untuk diinjeksi di seluruh aplikasi
})

export class ApiService {

  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { } // Constructor dengan injeksi HttpClient

  // GET request
  // Mendapatkan daftar postingan dari API
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  // POST request
  // Membuat postingan baru di API
  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts`, post);
  }

  // PUT request
  // Memperbarui postingan tertentu di API berdasarkan ID
  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/posts/${id}`, post);
  }

  // PATCH request
  // Memperbarui bagian dari postingan tertentu di API berdasarkan ID
  patchPost(id: number, post: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/posts/${id}`, post);
  }

  // DELETE request
  // Menghapus postingan tertentu dari API berdasarkan ID
  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`);
  }
}
