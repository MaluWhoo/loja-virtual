import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-produto-lista',
  styleUrl: './produto-lista.css',
  templateUrl: './produto-lista.html',
})
export class ProdutoLista implements OnInit {

  constructor(public ProdutoService: ProdutoService) { }

  ngOnInit(): void {
    
  }
}