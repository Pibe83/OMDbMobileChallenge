import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  selectedSegment = 'movies';
  mediaList: any[] = [];
  groupedMediaList: any[] = [];
  searchTerm: string = ''; // Aggiungi il termine di ricerca
  filteredMediaList: any[] = []; // Aggiungi l'elenco filtrato

  constructor(private http: HttpClient) {
    this.getRandomMediaList(); // Carica i 4 film casuali di default all'avvio
  }

  getRandomMediaList() {
    // Assumi che tu abbia un elenco di film casuali predefiniti (puoi anche ottenere film casuali da un'altra API)
    const randomMovies = [
      { Title: 'Film Casuale 1', Poster: 'url-poster-1' },
      { Title: 'Film Casuale 2', Poster: 'url-poster-2' },
      { Title: 'Film Casuale 3', Poster: 'url-poster-3' },
      { Title: 'Film Casuale 4', Poster: 'url-poster-4' },
      // Puoi aggiungere altri film casuali qui o ridurre il numero a 4
    ];

    this.mediaList = randomMovies;
    this.groupedMediaList = this.chunkArray(this.mediaList, 5);

    // Applica il filtro solo se è presente un termine di ricerca
    if (this.searchTerm) {
      this.filterMediaList();
    }
  }

  getMediaList() {
    const apiKey = '893e80b9';
    const apiUrl = 'http://www.omdbapi.com/';

    let params = new HttpParams();
    params = params.append('apikey', apiKey);
    params = params.append('type', this.selectedSegment);
    params = params.append('s', this.searchTerm); // Utilizza il termine di ricerca nel parametro 's'

    this.http.get(apiUrl, { params }).subscribe((response: any) => {
      if (response && response.Search) {
        this.mediaList = response.Search;
        this.groupedMediaList = this.chunkArray(this.mediaList, 5);

        // Aggiorna l'elenco filtrato con i risultati della ricerca
        this.filterMediaList();
      }
    });
  }

  filterMediaList() {
    // Trasforma il termine di ricerca in minuscolo per effettuare una ricerca case-insensitive
    const searchTermLower = this.searchTerm.toLowerCase();

    // Se searchTerm è vuoto, mostra i film casuali di default
    if (!this.searchTerm) {
      this.filteredMediaList = this.mediaList;
    } else {
      // Altrimenti, filtra l'elenco di media in base al termine di ricerca
      this.filteredMediaList = this.mediaList.filter(media => {
        const titleLower = media.Title.toLowerCase();
        return titleLower.includes(searchTermLower); // Restituisce true se il titolo include il termine di ricerca
      });
    }

    // Se vuoi anche raggruppare i risultati filtrati in righe di cinque card, puoi farlo qui
    this.groupedMediaList = this.chunkArray(this.filteredMediaList, 5);
  }

  chunkArray(arr: any[], chunkSize: number): any[] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }

  segmentChanged() {
    this.getMediaList();
  }
}



