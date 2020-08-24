package steps

import br.com.zup.UtilResources
import br.com.zup.screens.ScreenFactory
import io.cucumber.java.After
import io.cucumber.java.Before
import io.cucumber.java.en.*
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.testng.Assert
import java.util.concurrent.TimeUnit

class ImageScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@image")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=image")

        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }

    @Given("^that I'm on the image screen$")
    fun checkImageScreen() {
        var imageScreen = screenFactory.getImageScreen()

        Assert.assertTrue(imageScreen.imageText1?.isDisplayed)
    }

    @Then("^image screen should render all text attributes correctly$")
    fun checkImageScreenTexts() {
        var imageScreen = screenFactory.getImageScreen()

        Assert.assertTrue(imageScreen.imageText1?.text.equals("Image"))
        Assert.assertTrue(imageScreen.imageText2?.text.equals("Image with contentMode = FIT_XY"))
        Assert.assertTrue(imageScreen.imageText3?.text.equals("Image with contentMode = FIT_CENTER"))
        Assert.assertTrue(imageScreen.imageText4?.text.equals("Image with contentMode = CENTER_CROP"))
        Assert.assertTrue(imageScreen.imageText5?.text.equals("Image with contentMode = CENTER"))
    }

    @After("@image")
    fun driverClose() {
        driver.close()
    }
}