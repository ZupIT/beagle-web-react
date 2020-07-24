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

class TouchableScreenSteps {

    lateinit var driver: WebDriver

    @Before("@touchable")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=touchable")
    }


    @Given("^that I'm on the touchable screen$")
    fun checkImageScreen() {
        var textWithTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/p"))
            Assert.assertTrue(textWithTouchableText.isDisplayed)
    }

    @And("^I have a text with touchable configured$")
    fun checkTextWithTouchable() {
        var textWithTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/p"))
            Assert.assertTrue(textWithTouchableText.text.equals("Text with Touchable"))
    }

    @And("^I have an image with touchable configured$")
    fun checkImageWithTouchable() {
        var imageWithTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/p"))
        Assert.assertTrue(imageWithTouchableText.text.equals("Image with Touchable"))
    }

    @When("^I click on touchable text Click here!$")
    fun clickOnTouchableText() {

        var clickHereTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div/p"))
        Assert.assertTrue(clickHereTouchableText.text.equals("Click here!"))

        driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div/p")).click()
    }

    @Then("^touchable screen should render all text attributes correctly$")
    fun checkTouchableScreenTexts() {

        var textWithTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/p"))
        Assert.assertTrue(textWithTouchableText.text.equals("Text with Touchable"))

        var clickHereTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div/p"))
        Assert.assertTrue(clickHereTouchableText.text.equals("Click here!"))

        var imageWithTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/p"))
        Assert.assertTrue(imageWithTouchableText.text.equals("Image with Touchable"))

        var networkImageWithTouchableText = driver.findElement(By.xpath("/html/body/div/div/div/div[3]/p"))
        Assert.assertTrue(networkImageWithTouchableText.text.equals("NetworkImage with Touchable"))
    }

    @Then("touchable component should render the action attribute correctly")
    fun renderActionAttributeCorrectly() {
        var actionClickText = driver.findElement(By.xpath("/html/body/div/div/p"))
        Assert.assertTrue(actionClickText.text.equals("You clicked right"))
    }

    @After("@touchable")
    fun driverClose() {
        driver.close()
    }
}