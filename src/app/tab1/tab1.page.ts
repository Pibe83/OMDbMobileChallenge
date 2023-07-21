import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  selectedSegment = 'movies';
  mediaList: any[] = [];
  groupedMediaList: any[] = [];
  searchTerm: string = '';
  filteredMediaList: any[] = [];

  // Aggiungi queste due proprietà
  selectedSortCriteria: string = ''; // Criterio di ordinamento selezionato dall'utente
  sortCriteriaOptions: string[] = ['Anno', 'Alfabetico', 'Valutazione']; // Opzioni di ordinamento disponibili

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRandomMediaList();
  }

  getRandomMediaList() {
    const apiKey = '893e80b9';
    const apiUrl = 'http://www.omdbapi.com/';
    const randomMovieIds = ['tt0111161', 'tt0468569', 'tt1375666', 'tt0137523', 'tt0120737', 'tt0167260', 'tt0133093', 'tt0172495'];

    randomMovieIds.forEach(movieId => {
      let params = new HttpParams();
      params = params.append('apikey', apiKey);
      params = params.append('i', movieId);

      this.http.get(apiUrl, { params }).subscribe((response: any) => {
        if (response) {
          this.filteredMediaList.push(response);
          this.groupedMediaList = this.chunkArray(this.filteredMediaList, 5);

          if (this.searchTerm) {
            this.filterMediaList();
          }
        }
      });
    });
  }

  getMediaList() {
    const apiKey = '893e80b9';
    const apiUrl = 'http://www.omdbapi.com/';

    let params = new HttpParams();
    params = params.append('apikey', apiKey);
    params = params.append('type', this.selectedSegment);
    params = params.append('s', this.searchTerm);

    this.http.get(apiUrl, { params }).subscribe((response: any) => {
      if (response && response.Search) {
        this.mediaList = response.Search;
        this.groupedMediaList = this.chunkArray(this.mediaList, 5);

        this.filterMediaList();
      }
    });
  }

  filterMediaList() {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (!this.searchTerm) {
      this.filteredMediaList = this.mediaList;
    } else {
      this.filteredMediaList = this.mediaList.filter(media => {
        const titleLower = media.Title.toLowerCase();
        return titleLower.includes(searchTermLower);
      });
    }

    this.groupedMediaList = this.chunkArray(this.filteredMediaList, 5);

    // Applica l'ordinamento dopo aver filtrato l'elenco
    this.sortMediaList();
  }

  // Metodo per ordinare l'elenco dei film o serie
  sortMediaList() {
    switch (this.selectedSortCriteria) {
      case 'Anno':
        this.filteredMediaList.sort((a, b) => (a.Year > b.Year ? 1 : -1));
        break;
      case 'Alfabetico':
        this.filteredMediaList.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'Valutazione':
        this.filteredMediaList.sort((a, b) => (a.imdbRating < b.imdbRating ? 1 : -1));
        break;
      default:
        break;
    }

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

  // Metodo chiamato quando l'utente seleziona un nuovo criterio di ordinamento
  onSortChange(event: any) {
    this.sortMediaList();
  }
}




