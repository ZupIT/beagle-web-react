package steps

import br.com.zup.UtilResources
import io.cucumber.java.PendingException
import io.cucumber.java.en.*
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.testng.annotations.AfterTest
import org.testng.annotations.BeforeTest
import java.util.concurrent.TimeUnit

class TabViewScreenSteps {

    lateinit var driver: WebDriver

    @BeforeTest
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=tabview")
    }

    @AfterTest
    fun driverClose() {
        driver.close()
    }

    @Given("^that I'm on the tabview screen$")
    fun checkTabViewScreen() {

        throw PendingException()

    }

    @Then("^my tabview components should render their respective tabs attributes correctly$")
    fun checkTabViewRendersTabs() {

        throw PendingException()

    }

    @When("^I click on text (.*)$")
    fun clickOnText() {

        throw PendingException()

    }

    @Then("^my tab should render the text (.*) and (.*) correctly$")
    fun renderTextCorrectly() {

        throw PendingException()

    }
}