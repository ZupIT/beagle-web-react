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

class PageViewScreenSteps {

    lateinit var driver: WebDriver

    @Before("@pageview")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=pageview")
    }


    @Given("^that I'm on the pageview screen$")
    fun checkTabViewScreen() {
        var page1Text = driver.findElement(By.xpath("/html/body/div/div/div/div/p[1]"))
        Assert.assertTrue(page1Text.isDisplayed)
    }

    @Then("^my pageview components should render their respective pages attributes correctly$")
    fun checkTabViewRendersTabs() {

        var page1Text = driver.findElement(By.xpath("/html/body/div/div/div/div/p[1]"))
        Assert.assertTrue(page1Text.text.equals("Page 1"))

        driver.findElement(By.xpath("/html/body/div/div/div/span[2]")).click()

        var page2Text = driver.findElement(By.xpath("/html/body/div/div/div/div/p[2]"))
        Assert.assertTrue(page2Text.text.equals("Page 2"))

        driver.findElement(By.xpath("/html/body/div/div/div/span[2]")).click()

        var page3Text = driver.findElement(By.xpath("/html/body/div/div/div/div/p[3]"))
        Assert.assertTrue(page3Text.text.equals("Page 3"))

    }

    @After("@pageview")
    fun driverClose() {
        driver.close()
    }
}