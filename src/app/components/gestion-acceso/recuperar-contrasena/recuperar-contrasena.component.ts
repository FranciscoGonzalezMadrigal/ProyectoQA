import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['../compartir-form.css', './recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {

  recuperar_form: FormGroup = {} as FormGroup;
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder, private acceso_service: AccesoService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.recuperar_form = this.formBuilder.group({
      correo: ['', [Validators.required]]
    });
  }

  get form() { return this.recuperar_form.controls }

  recuperar_contrasena() {
    let recuperar_info = this.recuperar_form.getRawValue();

    this.submitted = true;

    if (this.recuperar_form.invalid) { return; }

    console.log(recuperar_info)

    this.acceso_service.recuperar_contrasena(recuperar_info).subscribe((res: any) => {
      this.toastr.clear();
      console.log(res.body);
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.toastr.success(`Se envió un correo para recuperar su contraseña`, res.body.resultado, { timeOut: 2000 });
      }
    });

    this.submitted = false;
  }


}
