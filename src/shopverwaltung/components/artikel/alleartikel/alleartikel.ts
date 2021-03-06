import {Component, CORE_DIRECTIVES, OnInit} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Response} from 'angular2/http';

import ArtikelService from '../../../service/artikel_service';
import Artikel from '../../../model/artikel';

@Component({
    selector: 'alleartikel',
    template: `
        <div *ng-if="loading">Die Daten werden geladen. Bitte warten ...</div>

		<div class="panel panel-primary" *ng-if="!init && !loading && artikel.length > 0">
		<div class="panel-heading">
                <h3 class="panel-title">
                    Alle Artikel
                </h3>
            </div>
			<div class="panel-body">
                <table class="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Nr.</th>
                            <th>ID</th>
                            <th>Bezeichnung</th>
                            <th>Kategorie</th>
                            <th>Preis</th>
                            <th><span class="sr-only">Spalte f&uuml;r Details</span></th>
                        </tr>
                    </thead>
					<tbody>
                        <!-- Template Binding: ng-for -->
                        <tr *ng-for="var a of artikel; var i = index">
                        <!--
                        <tr *ng-for="#a of artikel; #i = index">
                        -->
                            <td>{{i + 1}}</td>
                            <td>{{a.id}}</td>
                            <td>{{a.bezeichnung}}</td>
                            <td>{{a.kategorie}}</td>
                            <td>{{a.preis  | currency: 'EUR': true}}</td>
                             <td>
                                <a [router-link]="['/ArtikelDetail', {'id': a.id}]"
                                (click)="buchung = a" data-toggle="tooltip" title="Details anzeigen">
                                    <i class="fa fa-search"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <a onclick="text1.style.display='block';an.style.display='none';zu.style.display='block'" id="an" align='center' style="display: block" href="#neu">Als JSON Datensaetze anzeigen</a>
                <a onclick="text1.style.display='none';an.style.display='block';zu.style.display='none'" id="zu" align='center' style="display: none" href="#neu">zuklappen</a>
                <a name="neu"></a><DIV id="text1" style="display: none"><pre>{{artikel | json}}</pre></div>

            </div>
            <div class="panel-footer" align='center'>
                Zum loeschen bitte nach Artiel suchen
            </div>
        </div>

        <div *ng-if="!init && !loading && artikel.length === 0">
            Es gibt noch keine Einzahlungen
        </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export default class AlleArtikel {

    artikel: Array<Artikel> = [];
    get loading(): boolean { return this._artikelservice.loadingFind; }
    get init(): boolean { return this._artikelservice.initFind; }

    constructor(private _artikelservice: ArtikelService) {
        this._artikelservice.getall().subscribe(res => this.artikel = res);
        console.log('Auszahlungen.constructor()' + this.artikel);
    }

    toString(): String { return 'AlleArtikel'; }
}