import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.page.html',
  styleUrls: ['./dettagli.page.scss'],
})
export class DettagliPage implements OnInit {
  movieId: string = '';
  movieDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Recupero l'ID del film o della serie dalla route attuale
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id')!;
      this.getMovieDetails();
    });
  }

  getMovieDetails() {
    // Effettuo una richiesta all'API OMDb per ottenere i dettagli del film o della serie specificato dall'ID
    const apiKey = '893e80b9';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${this.movieId}`;

    this.http.get(apiUrl).subscribe((response: any) => {
      this.movieDetails = response; // Assegno i dettagli ottenuti dall'API alla proprietà movieDetails
    });
  }

  goBackToTab1() {
    this.navCtrl.navigateBack('/tabs/tab1');
  }
}




