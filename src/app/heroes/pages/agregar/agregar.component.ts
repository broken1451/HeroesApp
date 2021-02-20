import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  public creadores: any[] = [
    {
      id: 'DC Comics',
      desc: 'Dc - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  public heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alter_img: '',
    publisher: Publisher.DcComics,
  };

  public editNew: string = '';
  public deletedNew: string = '';

  get editarNuevo(): string {
    // return (this.heroe.id) ? 'Editar' : 'Nuevo';
    if (this.heroe.id) {
      return this.editNew = 'Editar';
    } else {
      return this.editNew = 'Nuevo';
    }
  }

  get deleteNuevo(): string {
    // return (this.heroe.id) ? 'Actualizar' : 'Crear';
    if (this.heroe.id) {
      return this.deletedNew = 'Actualizar';
    } else {
      return this.deletedNew = 'Crear';
    }
  }

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.getHero(id)))
        .subscribe((hero) => {
          this.heroe = hero;
        });
    } else {
      return;
    }
  }

  submit(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroeService.updateHero(this.heroe).subscribe((heroe) => {
        this.showSnackBar('Registro actualizado');
      });
    } else {
      this.heroeService.addHero(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.showSnackBar('Registro creado');
      });
    }
  }

  getHero(id: string): Observable<Heroes> {
    return this.heroeService.getHeroeById(id);
  }

  deleteHero(): void {
    // this.dialog.open(ConfirmarComponent, {
    //   width: '250px',
    //   disableClose: true,
    //   // data: { ...this.heroe },
    //   // enviando data hacia el componente del dialogo
    //   data: this.heroe,
    // });
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      disableClose: true,
      data: {...this.heroe},
    });

    dialogRef.afterClosed().pipe(
      switchMap( (result: any) => {
        if (result) {
          return this.delete(result);
        } else{
          return of(undefined);
        }
      })
    ).subscribe((result) => {
      if (result) {
        this.router.navigate(['/heroes']);
      }
    });

    // una opcion
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.heroeService.deleteHero(this.heroe).subscribe((heroe) =>{
    //       console.log({heroe})
    //       this.router.navigate(['/heroes']);
    //     });
    //   }
    // });
  }

  showSnackBar(message: string): void {
    this._snackBar.open(message, 'ok!', {
      duration: 2500,
    });
  }

  delete(heroe: Heroes): Observable<{}> {
    return this.heroeService.deleteHero(heroe);
  }
}
