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

class ButtonScreenSteps {

    lateinit var driver: WebDriver

    @Before("@button")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=button")
    }


    @Given("that I'm on the button screen")
    fun checkButtonScreen() {
       var buttonDefault = driver.findElement(By.xpath("//button[@data-beagle-id='_beagle_2']"))
            Assert.assertTrue(buttonDefault.isDisplayed)
    }

    @When("I click on button")
    fun clickOnButton() {
        driver.findElement(By.xpath("//button[@data-beagle-id='_beagle_2']")).click()
    }

    @Then("all my button components should render their respective text attributes correctly")
    fun renderTextAttributeCorrectly() {

        var buttonDefault = driver.findElement(By.xpath("//button[@data-beagle-id='_beagle_2']"))
             Assert.assertTrue(buttonDefault.text.equals("Button"))

        var buttonWithStyle = driver.findElement(By.xpath("//button[@data-beagle-id='_beagle_3']"))
        Assert.assertTrue(buttonWithStyle.text.equals("Button with style"))

        var buttonWithAppearance = driver.findElement(By.xpath("//button[@data-beagle-id='_beagle_4']"))
        Assert.assertTrue(buttonWithAppearance.text.equals("Button with Appearance"))

        var buttonWithAppearanceAndStyle = driver.findElement(By.xpath("//button[@data-beagle-id='_beagle_5']"))
        Assert.assertTrue(buttonWithAppearanceAndStyle.text.equals("Button with Appearance and style"))

    }

    @Then("component should render the action attribute correctly")
    fun renderActionAttributeCorrectly() {
        var actionClickText = driver.findElement(By.xpath("/html/body/div/div/p"))
        Assert.assertTrue(actionClickText.text.equals("You clicked right"))
    }

    @After("@button")
    fun driverClose() {
        driver.close()
    }

}