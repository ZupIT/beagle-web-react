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

class ListViewScreeSteps {

    lateinit var driver: WebDriver

    @Before("@listview")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=listview")
    }

    @Given("^that I'm on the listview screen$")
    fun checkListViewScreen() {
        var listViewStaticVerticalText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/p"))
        Assert.assertTrue(listViewStaticVerticalText.isDisplayed)
    }

    @Then("^I have a vertical list configured$")
    fun checkVerticalListText() {
        var listViewStaticVerticalText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/p"))
        Assert.assertTrue(listViewStaticVerticalText.text.equals("Static VERTICAL ListView"))

        var listViewDynamicVerticalText = driver.findElement(By.xpath("/html/body/div/div/div/div[3]/p"))
        Assert.assertTrue(listViewDynamicVerticalText.text.equals("Dynamic VERTICAL ListView"))
    }

    @When("^I have a horizontal list configured$")
    fun checkHorizontalListText() {
        var listViewStaticHorizontalText = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/p"))
        Assert.assertTrue(listViewStaticHorizontalText.text.equals("Static HORIZONTAL ListView"))

        var listViewDynamicHorizontalText = driver.findElement(By.xpath("/html/body/div/div/div/div[4]/p"))
        Assert.assertTrue(listViewDynamicHorizontalText.text.equals("Dynamic HORIZONTAL ListView"))
    }

    @Then("^listview screen should render all text attributes correctly$")
    fun checkListViewScreenTexts() {

        var listViewStaticVerticalText = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/p"))
        Assert.assertTrue(listViewStaticVerticalText.text.equals("Static VERTICAL ListView"))

        var listViewStaticHorizontalText = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/p"))
        Assert.assertTrue(listViewStaticHorizontalText.text.equals("Static HORIZONTAL ListView"))

        var listViewDynamicVerticalText = driver.findElement(By.xpath("/html/body/div/div/div/div[3]/p"))
        Assert.assertTrue(listViewDynamicVerticalText.text.equals("Dynamic VERTICAL ListView"))

        var listViewDynamicHorizontalText = driver.findElement(By.xpath("/html/body/div/div/div/div[4]/p"))
        Assert.assertTrue(listViewDynamicHorizontalText.text.equals("Dynamic HORIZONTAL ListView"))
    }


    @After("@listview")
    fun driverClose() {
        driver.close()
    }

}