// Import fungsi TestBed dan inject dari modul @angular/core/testing
import { TestBed, inject } from '@angular/core/testing';

// Import modul HttpClientTestingModule dan HttpTestingController dari @angular/common/http/testing
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Import layanan ApiService yang akan diuji
import { ApiService } from './api.service';

// Deskripsi pengujian untuk ApiService
describe('ApiService', () => {
  let service: ApiService; // Variabel untuk menyimpan instance ApiService yang akan diuji
  let httpMock: HttpTestingController; // Variabel untuk menyimpan instance HttpTestingController untuk menguji panggilan HTTP

  // Blok kode yang dijalankan sebelum setiap pengujian dimulai
  beforeEach(() => {
    // Konfigurasi TestBed untuk modul pengujian
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Impor modul HttpClientTestingModule untuk menyediakan fasilitas untuk menguji panggilan HTTP
      providers: [ApiService] // Sediakan ApiService sebagai layanan yang akan diuji
    });

    // Dapatkan instance ApiService dari TestBed
    service = TestBed.inject(ApiService);
    // Dapatkan instance HttpTestingController dari TestBed
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Blok kode yang dijalankan setelah setiap pengujian selesai
  afterEach(() => {
    // Verifikasi bahwa tidak ada panggilan HTTP yang tertinggal setelah setiap pengujian selesai
    httpMock.verify();
  });

  // Pengujian untuk memastikan bahwa metode getPosts() dari ApiService berhasil mengambil data postingan dari server dengan benar
  it('should fetch posts successfully', () => {
    // Data dummy yang akan digunakan untuk mensimulasikan respons dari panggilan HTTP
    const dummyPosts = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' },
      { userId: 1, id: 2, title: 'Post 2', body: 'Body 2' },
    ];

    // Subscribe ke metode getPosts() dari ApiService dan pastikan data postingan yang diterima sesuai dengan data yang diharapkan
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2); // Memastikan jumlah postingan yang diterima adalah 2
      expect(posts).toEqual(dummyPosts); // Memastikan bahwa data postingan yang diterima sama dengan data dummyPosts yang telah ditetapkan
    });

    // Mengantisipasi panggilan HTTP yang dihasilkan oleh metode getPosts()
    const req = httpMock.expectOne(`${service['baseUrl']}/posts`);
    expect(req.request.method).toBe('GET'); // Memastikan bahwa metode HTTP yang digunakan adalah GET

    // Memberikan respons palsu dari panggilan HTTP yang telah diharapkan
    req.flush(dummyPosts);
  });
});
