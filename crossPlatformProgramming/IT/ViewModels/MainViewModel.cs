using System;
using System.ComponentModel;
using System.Numerics;
using System.Windows.Input;
using Microsoft.Maui.Controls;

namespace IT.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private string _result;
    private string _inputA;
    private string _inputB;

    public event PropertyChangedEventHandler PropertyChanged;

    public string InputA
    {
        get => _inputA;
        set
        {
            _inputA = value;
            OnPropertyChanged(nameof(InputA));
        }
    }

    public string InputB
    {
        get => _inputB;
        set
        {
            _inputB = value;
            OnPropertyChanged(nameof(InputB));
        }
    }

    public string Result
    {
        get => _result;
        set
        {
            _result = value;
            OnPropertyChanged(nameof(Result));
        }
    }

    public ICommand CalculateCommand { get; }

    public MainViewModel()
    {
        CalculateCommand = new Command(Calculate);
    }

    private void Calculate()
    {
        if (!int.TryParse(InputA, out int a) || !int.TryParse(InputB, out int b))
        {
            Result = "Помилка: введіть цілі числа!";
            return;
        }

        List<int> numbers = new List<int>();
        int count = 0;

        for (int i = a; i <= b; i++)
        {
            if (i % 55 == 0 && i % 2 != 0 && i % 7 == 3)
            {
                numbers.Add(i);
                count++;
            }
        }
        string numbersString = string.Join(", ", numbers);

        Result = $"Кількість чисел: {count} | Числа: {numbersString}";
    }

    private void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
