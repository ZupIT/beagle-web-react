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

class TabViewScreenSteps {

    lateinit var driver: WebDriver

    @Before("@tabview")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=tabview")
    }


    @Given("^that I'm on the tabview screen$")
    fun checkTabViewScreen() {

        var tab1Text = driver.findElement(By.xpath("/html/body/div/div/div/div[1]"))
        Assert.assertTrue(tab1Text.isDisplayed)

    }

    @Then("^my tabview components should render their respective tabs attributes correctly$")
    fun checkTabViewRendersTabs() {

        var tab1Text = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[1]"))
        Assert.assertTrue(tab1Text.text.equals("Tab 1"))

        var tab1Text2 = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[3]/div/p[1]"))
        Assert.assertTrue(tab1Text2.text.equals("Welcome to Tab 1"))

        var tab1Text3 = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[3]/div/p[2]"))
        Assert.assertTrue(tab1Text3.text.equals("This is Tab1's second text"))


        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div")).click()
        var tab2Text = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div"))
        Assert.assertTrue(tab2Text.text.equals("Tab 2"))

        var tab2Text2 = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[3]/div/p[1]"))
        Assert.assertTrue(tab2Text2.text.equals("Welcome to Tab 2"))

        var tab2Text3 = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[3]/div/p[2]"))
        Assert.assertTrue(tab2Text3.text.equals("This is Tab2's second text"))


        driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div")).click()
        var tab3Text = driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div"))
        Assert.assertTrue(tab3Text.text.equals("Tab 3"))

        var tab3Text2 = driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[3]/div/p[1]"))
        Assert.assertTrue(tab3Text2.text.equals("Welcome to Tab 3"))

        var tab3Text3 = driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[3]/div/p[2]"))
        Assert.assertTrue(tab3Text3.text.equals("This is Tab3's second text"))


        driver.findElement(By.xpath("/html/body/div/div/div/div[4]/div")).click()
        var tab4Text = driver.findElement(By.xpath("/html/body/div/div/div/div[4]/div"))
        Assert.assertTrue(tab4Text.text.equals("Tab 4"))

        var tab4Text2 = driver.findElement(By.xpath("/html/body/div/div/div/div[4]/div[3]/div/p[1]"))
        Assert.assertTrue(tab4Text2.text.equals("Welcome to Tab 4"))

        var tab4Text3 = driver.findElement(By.xpath("/html/body/div/div/div/div[4]/div[3]/div/p[2]"))
        Assert.assertTrue(tab4Text3.text.equals("This is Tab4's second text"))
    }

    @After("@tabview")
    fun driverClose() {
        driver.close()
    }
}