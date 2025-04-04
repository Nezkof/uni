using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace IT.ViewModels
{
    internal class SecondaryViewModel : INotifyPropertyChanged
    {
        private int _num1;
        private int _num2;
        private int _num3;
        private int _count;

        public event PropertyChangedEventHandler PropertyChanged;

        public int Num1
        {
            get => _num1;
            set
            {
                _num1 = value;
                OnPropertyChanged(nameof(Num1));
            }
        }

        public int Num2
        {
            get => _num2;
            set
            {
                _num2 = value;
                OnPropertyChanged(nameof(Num2));
            }
        }

        public int Num3
        {
            get => _num3;
            set
            {
                _num3 = value;
                OnPropertyChanged(nameof(Num3));
            }
        }

        public int Count
        {
            get => _count;
            private set
            {
                _count = value;
                OnPropertyChanged(nameof(Count));
            }
        }

        public ICommand CalculateCommand { get; }

        public SecondaryViewModel()
        {
            CalculateCommand = new Command(Calculate);
        }

        private void Calculate()
        {
            Count = 0;

            if (_num1 % 44 == 0)
                Count++;
            if (_num2 % 44 == 0)
                Count++;
            if (_num3 % 44 == 0)
                Count++;
        }

        private void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
