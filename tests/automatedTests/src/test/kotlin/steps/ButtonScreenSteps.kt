package steps

import br.com.zup.UtilResources
import io.cucumber.java.PendingException
import io.cucumber.java.en.*
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.testng.annotations.AfterTest
import org.testng.annotations.BeforeTest
import java.util.concurrent.TimeUnit

class ButtonScreenSteps {

    lateinit var driver: WebDriver

    @BeforeTest
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=button")
    }

    @AfterTest
    fun driverClose() {
        driver.close()
    }


    @Given("that I'm on the button screen")
    fun checkButtonScreen() {
        driver.findElement(By.id("_beagle_2")).isDisplayed

        throw PendingException()
    }

    @When("I click on button")
    fun clickOnButton() {
        driver.findElement(By.id("_beagle_2")).click()

        throw PendingException()
    }

    @Then("all my button components should render their respective text attributes correctly")
    fun renderTextAttributeCorrectly() {
        driver.findElement(By.id("_beagle_2")).isDisplayed
        driver.findElement(By.id("_beagle_3")).isDisplayed
        driver.findElement(By.id("_beagle_4")).isDisplayed
        driver.findElement(By.id("_beagle_5")).isDisplayed

        throw PendingException()
    }

    @Then("component should render the action attribute correctly")
    fun renderActionAttributeCorrectly() {
        driver.findElement(By.id("_beagle_8")).isDisplayed

        throw PendingException()
    }

}