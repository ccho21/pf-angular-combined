import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpHeaders;
@Injectable({
  providedIn: 'root',
})
export class UploadFilesService {
  constructor(private http: HttpClient) {}
  upload(files: FileList): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    return this.http.post(`/api/upload/images`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getFiles(key: string): Observable<any> {
    return this.http.get(`api/upload/images/${key}`);
  }
}
