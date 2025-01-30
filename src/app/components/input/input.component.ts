// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-input',
//   templateUrl: './input.component.html',
//   styleUrls: ['./input.component.css'],
//   standalone: false
// })
// export class InputComponent {
//   @Input() placeholder?: string;
//   @Input() type: 'text' | 'number' | 'email' | 'date' | 'password' = 'text';
//   @Input() required: boolean = false;
//   @Input() model: string | number | null = '';

//   @Output() data = new EventEmitter<string| number|null>();

//   inptControl: FormControl = new FormControl('', []);
//   value: string | number | null | undefined;

  
//   ngOnInit(): void {
//     this.setValidators();
//     this.inptControl.valueChanges.subscribe((value) => {
//       this.data.emit(value);
//     });
//   }


//   ngOnChanges(): void {
//     this.setValidators();
//   }
  
//   setValidators() {
//     const validators = [];
//     if (this.required) {
//       validators.push(Validators.required);
//     }
//     switch (this.type) {
//       case 'email':
//         validators.push(Validators.email);
//         // this.inptControl.setValidators([Validators.email]);
//         break;
//       case 'number':
//         validators.push(Validators.min(0));
//         // this.inptControl.setValidators([Validators.min(0)]);
//         break;
//       case 'password':
//         validators.push(Validators.minLength(8),Validators.pattern('^(?=.*[A-Z])(?=.*[%&?]).*$'));
//         // this.inptControl.setValidators([
//         //   Validators.minLength(6),
//         //   Validators.pattern('^(?=.*[A-Z])(?=.*[%&?]).*$')
//         // ]);
//         break;
//     }
//     this.inptControl.setValidators(validators);
//     this.inptControl.updateValueAndValidity();
//   }

//   get showError(): boolean {
//     return this.inptControl.touched && this.inptControl.invalid;
//   }

//   get errorMessage(): string {
//     if (this.inptControl.hasError('required')) {
//       return 'Bu alan zorunludur.';
//     }
//     if (this.inptControl.hasError('email')) {
//       return 'Geçerli bir e-posta adresi giriniz.';
//     }
//     if (this.inptControl.hasError('min')) {
//       return 'Sayı sıfırdan küçük olamaz.';
//     }
//     if (this.inptControl.hasError('minlength')) {
//       return `Şifre en az ${this.inptControl.getError('minlength').requiredLength} karakter olmalıdır.`;
//     }
//     if (this.inptControl.hasError('pattern')) {
//       return 'Şifre en az bir büyük harf ve bir özel karakter (!%&?) içermelidir.';
//     }
//     return '';
//   }

// }



import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone : false
})
export class InputComponent {
  @Input() placeholder?: string;
  @Input() type: 'text' | 'number' | 'email' | 'date' | 'password' = 'text';
  @Input() required: boolean = false;
  @Input() model: string | number | null = '';

  @Output() modelChange = new EventEmitter<string | number | null>();
  @Output() data = new EventEmitter<string | number | null>();


  touched: boolean = false;

  inputChange(value: string | number | null) {
    this.modelChange.emit(value);
  }

  sendData() {
    this.touched = true;
    this.data.emit(this.model);
  }

  get errorMessage(): string {
    if (!this.touched) return '';

    if (this.required && !this.model) {
        return 'Bu alan zorunludur.';
    }
    if (this.type === 'email' && this.model && !/^\S+@\S+\.\S+$/.test(this.model.toString())) {
      return 'Geçerli bir e-posta adresi giriniz.';
    }
    if (this.type === 'number' && this.model && Number(this.model) < 0) {
      return 'Sayı sıfırdan küçük olamaz.';
    }
    if (this.type === 'password' && this.model && !/(?=.*[A-Z])(?=.*[!%&?])/.test(this.model.toString())) {
      return 'Parola en az bir büyük harf ve bir özel karakter (!%&?) içermelidir.';
    }
    return '';
  }
}
