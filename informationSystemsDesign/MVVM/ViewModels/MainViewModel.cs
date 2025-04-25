using System.ComponentModel;

using System.Runtime.CompilerServices;

using MVVM.Models;

namespace MVVM.ViewModels
{
    public class MainViewModel : INotifyPropertyChanged
    {
        private CartItem _cartItem;

        public MainViewModel()
        {
            _cartItem = new CartItem();
        }

        public decimal Price
        {
            get => _cartItem.Price;
            set
            {
                if (_cartItem.Price != value)
                {
                    _cartItem.Price = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(Discount));
                }
            }
        }

        public int Quantity
        {
            get => _cartItem.Quantity;
            set
            {
                if (_cartItem.Quantity != value)
                {
                    _cartItem.Quantity = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(Discount));
                }
            }
        }

        public decimal Discount => _cartItem.Discount;

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
