package steps

import br.com.zup.UtilResources
import io.cucumber.java.After
import io.cucumber.java.Before
import io.cucumber.java.PendingException
import io.cucumber.java.en.*
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.testng.Assert
import java.util.concurrent.TimeUnit

class ListViewScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@listview")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=listview")

        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("^that I'm on the listview screen$")
    fun checkListViewScreen() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticVerticalText.isDisplayed)
    }

    @Then("^I have a vertical list configured$")
    fun checkVerticalListText() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticVerticalText.text.equals("Static VERTICAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicVerticalText.text.equals("Dynamic VERTICAL ListView"))
    }

    @When("^I have a horizontal list configured$")
    fun checkHorizontalListText() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticHorizontalText.text.equals("Static HORIZONTAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicHorizontalText.text.equals("Dynamic HORIZONTAL ListView"))
    }

    @Then("^listview screen should render all text attributes correctly$")
    fun checkListViewScreenTexts() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticVerticalText.text.equals("Static VERTICAL ListView"))
        Assert.assertTrue(listViewScreen.listViewStaticHorizontalText.text.equals("Static HORIZONTAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicVerticalText.text.equals("Dynamic VERTICAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicHorizontalText.text.equals("Dynamic HORIZONTAL ListView"))
    }


    @After("@listview")
    fun driverClose() {
        driver.close()
    }
}

