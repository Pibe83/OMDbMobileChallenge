import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  selectedSegment = 'movies';
  mediaList: any[] = [];
  groupedMediaList: any[] = [];
  searchTerm: string = '';
  filteredMediaList: any[] = [];
  selectedSortCriteria: string = 'Year';

  sortCriteriaOptions: string[] = ['Year', 'Title', 'imdbRating'];

  private darkModeSubscription!: Subscription;
  isDarkMode: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.darkModeSubscription = this.themeService.isDarkMode.subscribe((value) => {
      this.isDarkMode = value;
    });
    this.getRandomMediaList();
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }

  getRandomMediaList() {
    const apiKey = '893e80b9';
    const apiUrl = 'http://www.omdbapi.com/';
    const randomMovieIds = ['tt0111161', 'tt0468569', 'tt1375666', 'tt0137523', 'tt0120737', 'tt0167260', 'tt0133093', 'tt0172495', 'tt1375666','tt0111161', 'tt0468569', 'tt1375666'];

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

  onSortChange(event: any) {
    this.filterMediaList();
  }

  toggleTheme() {
    this.themeService.setDarkMode(!this.isDarkMode);
  }

  navigateToDetailsPage(mediaId: string) {
    this.router.navigateByUrl(`/dettagli/${mediaId}`);
  }
}
