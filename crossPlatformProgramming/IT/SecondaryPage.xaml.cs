namespace IT;

public partial class SecondaryPage : ContentPage
{
	public SecondaryPage()
	{
		InitializeComponent();
	}

    private async void OnNavigateToMainPage(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new MainPage());
    }


}

