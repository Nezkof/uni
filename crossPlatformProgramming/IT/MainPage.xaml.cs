namespace IT;

public partial class MainPage : ContentPage
{

	public MainPage()
	{
		InitializeComponent();
	}

    private async void OnNavigateToSecondaryPage(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new SecondaryPage());
    }


}

