   M S B A M L   `   `   `  ����?  ;MVVM, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null1clr-namespace:MVVM.ViewModelsMVVM.ViewModels  5   	       MVVM.MainWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   ,vmclr-namespace:MVVM.ViewModels     5   	     � Title$'  !Розрахунок знижки��5   	   $	��250��6#   $	��400��60    � DataContext 5      #   MVVM.ViewModels.MainViewModel  5   
   .��5
      � $��20q�6    � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $
��Auto �6   �� 5      $
��Auto �6   .+�5   
   �� $��0��6    �� Orientation$ 
Horizontal=�6"   $��0,0,0,10q�6;   .+�5      �� $��Ціна товару:��6   $	��100��6,   $��Center=�68   �� 5      $	��200��6R   ��6   �� *Price+ �� UpdateSourceTrigger$ PropertyChanged=�6R   5      �� 5   
   $��1��6   $ 
Horizontal=�6"   $��0,0,0,10q�6;   .+�5      �� $��Кількість:��6   $	��100��6*   $��Center=�66   �� 5      $	��200��6U   ��6   �� *
Quantity+$ PropertyChanged=�6U   5      �� 5   
   $��2��6   $ 
Horizontal=�6"   .+�5      �� $��Знижка:��6   $	��100��6'   $��Center=�63   �� 5      $	��200��6E   $��Center=�6Q   ��6   �� *
Discount+ �� StringFormat$
 0.00��6Q   5      5      5       