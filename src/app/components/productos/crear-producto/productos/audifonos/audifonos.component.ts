import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-audifonos',
  templateUrl: './audifonos.component.html',
  styleUrls: ['./audifonos.component.css', '../../crear-producto.component.css']
})
export class AudifonosComponent implements OnInit {

  @Input() submitted: boolean = false;
  @Input() sub_form_creado: boolean = false;

  precio: string = ''

  audifonos_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer,
    private estilos_service: EstilosService) { }

  ngOnInit(): void {
    this.audifonos_form = (<FormGroup>this.controlContainer.control).get('producto') as FormGroup;
    console.log(this.form)
  }

  get form() { return this.audifonos_form.controls }

  get form_caracteristicas() { return (this.audifonos_form.get('caracteristicas') as FormGroup).controls }

  get tipo(): FormArray {return (this.audifonos_form.get('caracteristicas') as FormGroup).get('tipo') as FormArray}

  get marca(): FormArray {return (this.audifonos_form.get('caracteristicas') as FormGroup).get('marca') as FormArray}

  get conexiones(): FormArray { return (this.audifonos_form.get('caracteristicas') as FormGroup).get('conexion') as FormArray}

  transformar_dinero(elemento: any) {
    this.precio = this.estilos_service.transformar_dinero(elemento)
  }

  nueva_caracteristica(): FormControl {
    return this.fb.control('', Validators.required);
  }

  agregar_conexion() {
    this.conexiones.push(this.nueva_caracteristica());
  }

  eliminar_conexion(i: number) {
    this.conexiones.removeAt(i);
  }

}
