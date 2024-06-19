import 'zone.js'; // Import polyfill untuk Zone.js
import 'zone.js/testing'; // Import modul pengujian Zone.js

import { getTestBed } from '@angular/core/testing'; // Import fungsi getTestBed() dari Angular untuk mengakses TestBed
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'; // Import modul BrowserDynamicTestingModule dan platformBrowserDynamicTesting dari Angular untuk konfigurasi pengujian
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


// Deklarasikan variabel require agar TypeScript tidak menganggapnya tidak dideklarasikan
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// Inisialisasi lingkungan pengujian Angular.
// Menggunakan fungsi initTestEnvironment() dari TestBed untuk mengonfigurasi lingkungan pengujian
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Kemudian, temukan semua tes.
const context = require.context('./', true, /\.spec\.ts$/);
// Dan muat modul-modul tersebut.
context.keys().map(context);
