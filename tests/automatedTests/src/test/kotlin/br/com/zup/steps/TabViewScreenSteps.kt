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
    lateinit var screenFactory: ScreenFactory

    @Before("@tabview")
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=tabview")

        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("^that I'm on the tabview screen$")
    fun checkTabViewScreen() {
        var tabViewScreen = screenFactory.getTabViewScreen()

        Assert.assertTrue(tabViewScreen.tab1Text.isDisplayed)

    }

    @Then("^my tabview components should render their respective tabs attributes correctly$")
    fun checkTabViewRendersTabs() {
        var tabViewScreen = screenFactory.getTabViewScreen()

        Assert.assertTrue(tabViewScreen.tab1Text.text.equals("Tab 1"))
        Assert.assertTrue(tabViewScreen.tab1Text2.text.equals("Welcome to Tab 1"))
        Assert.assertTrue(tabViewScreen.tab1Text3.text.equals("This is Tab1's second text"))


        tabViewScreen.tab2Text.click()
        Assert.assertTrue(tabViewScreen.tab2Text.text.equals("Tab 2"))
        Assert.assertTrue(tabViewScreen.tab2Text2.text.equals("Welcome to Tab 2"))
        Assert.assertTrue(tabViewScreen.tab2Text3.text.equals("This is Tab2's second text"))


        tabViewScreen.tab3Text.click()
        Assert.assertTrue(tabViewScreen.tab3Text.text.equals("Tab 3"))
        Assert.assertTrue(tabViewScreen.tab3Text2.text.equals("Welcome to Tab 3"))
        Assert.assertTrue(tabViewScreen.tab3Text3.text.equals("This is Tab3's second text"))


        tabViewScreen.tab4Text.click()
        Assert.assertTrue(tabViewScreen.tab4Text.text.equals("Tab 4"))
        Assert.assertTrue(tabViewScreen.tab4Text2.text.equals("Welcome to Tab 4"))
        Assert.assertTrue(tabViewScreen.tab4Text3.text.equals("This is Tab4's second text"))
    }

    @After("@tabview")
    fun driverClose() {
        driver.close()
    }
}


