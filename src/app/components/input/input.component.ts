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
  @Input() inputValue: string | number | null = '';

  @Output() inputValueChange = new EventEmitter<string | number | null>();
  @Output() data = new EventEmitter<string | number | null>();

  showPassword: boolean = false;

  touched: boolean = false;

  

  inputChange(value: string | number | null) {
    this.inputValueChange.emit(value);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  sendData() {
    this.touched = true;
    this.data.emit(this.inputValue);
  }

  get errorMessage(): string {
    if (!this.touched) return '';

    if (this.required && !this.inputValue) {
        return 'Bu alan zorunludur.';
    }
    if (this.type === 'email' && this.inputValue && !/^\S+@\S+\.\S+$/.test(this.inputValue.toString())) {
      return 'Geçerli bir e-posta adresi giriniz.';
    }
    if (this.type === 'number' && this.inputValue && Number(this.inputValue) < 0) {
      return 'Sayı sıfırdan küçük olamaz.';
    }
    if (this.type === 'password' && this.inputValue && !/(?=.*[A-Z])(?=.*[!%&?])/.test(this.inputValue.toString())) {
      return 'Parola en az bir büyük harf ve bir özel karakter (!%&?) içermelidir.';
    }
    return '';
  }
}

