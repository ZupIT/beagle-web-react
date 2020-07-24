package steps

import br.com.zup.UtilResources
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

    @Before("@image")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=image")
    }

    @Given("^that I'm on the image screen$")
    fun checkImageScreen() {

        var imageTitle = driver.findElement(By.xpath("/html/body/div/div/div/p[1]"))
        Assert.assertTrue(imageTitle.isDisplayed)

    }

    @Then("^image screen should render all text attributes correctly$")
    fun checkImageScreenTexts() {

        var imageText1 = driver.findElement(By.xpath("/html/body/div/div/div/p[1]"))
        Assert.assertTrue(imageText1.text.equals("Image"))

        var imageText2 = driver.findElement(By.xpath("/html/body/div/div/div/p[2]"))
        Assert.assertTrue(imageText2.text.equals("Image with contentMode = FIT_XY"))

        var imageText3 = driver.findElement(By.xpath("/html/body/div/div/div/p[3]"))
        Assert.assertTrue(imageText3.text.equals("Image with contentMode = FIT_CENTER"))

        var imageText4 = driver.findElement(By.xpath("/html/body/div/div/div/p[4]"))
        Assert.assertTrue(imageText4.text.equals("Image with contentMode = CENTER_CROP"))

        var imageText5 = driver.findElement(By.xpath("/html/body/div/div/div/p[5]"))
        Assert.assertTrue(imageText5.text.equals("Image with contentMode = CENTER"))
    }

    @After("@image")
    fun driverClose() {
        driver.close()
    }
}