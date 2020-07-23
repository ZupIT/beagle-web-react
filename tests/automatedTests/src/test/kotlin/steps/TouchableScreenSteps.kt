package steps

import br.com.zup.UtilResources
import io.cucumber.java.PendingException
import io.cucumber.java.en.*
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.testng.annotations.AfterTest
import org.testng.annotations.BeforeTest
import java.util.concurrent.TimeUnit

class TouchableScreenSteps {

    lateinit var driver: WebDriver

    @BeforeTest
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=touchable")
    }

    @AfterTest
    fun driverClose() {
        driver.close()
    }


    @Given("^that I'm on the touchable screen$")
    fun checkImageScreen() {

        throw PendingException()

    }

    @And("^I have a text with touchable configured$")
    fun checkTextWithTouchable() {

        throw PendingException()

    }

    @And("^I have an image with touchable configured$")
    fun checkImageWithTouchable() {

        throw PendingException()

    }

    @When("^I click on touchable text (.*)$")
    fun clickOnTouchableText(string1: String?) {

        throw PendingException()

    }

    @When("^I click on touchable image$")
    fun clickOnTouchableImage() {

        throw PendingException()

    }

    @Then("^touchable screen should render all text attributes correctly$")
    fun checkTouchableScreenTexts() {

        throw PendingException()

    }
}