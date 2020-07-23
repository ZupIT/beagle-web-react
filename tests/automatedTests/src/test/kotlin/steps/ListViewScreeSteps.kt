package steps

import br.com.zup.UtilResources
import io.cucumber.java.PendingException
import io.cucumber.java.en.*
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.testng.annotations.AfterTest
import org.testng.annotations.BeforeTest
import java.util.concurrent.TimeUnit

class ListViewScreeSteps {

    lateinit var driver: WebDriver

    @BeforeTest
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=listview")
    }

    @AfterTest
    fun driverClose() {
        driver.close()
    }

    @Given("^that I'm on the listview screen$")
    fun checkListViewScreen() {

        throw PendingException()

    }

    @When("^I have a vertical list configured$")
    fun checkVerticalListText() {

        throw PendingException()

    }

    @When("^I have a horizontal list configured$")
    fun checkHorizontalListText() {

        throw PendingException()

    }

    @Then("^listview screen should render all text attributes correctly$")
    fun checkListViewScreenTexts() {

        throw PendingException()


    }

    @Then("^listview screen should perform the scroll action vertically$")
    fun validateVerticalListScroll() {

        throw PendingException()

    }


}