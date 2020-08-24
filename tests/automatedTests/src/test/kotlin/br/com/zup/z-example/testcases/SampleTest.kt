package br.com.zup.testcases

import br.com.zup.UtilResources
import br.com.zup.webpages.HomePage
import br.com.zup.webpages.ResultPage
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.testng.Assert
import org.testng.annotations.AfterTest
import org.testng.annotations.BeforeTest
import org.testng.annotations.Test
import java.net.URI
import java.util.concurrent.TimeUnit

class SampleTest() {

    lateinit var driver: WebDriver
        private set

    @BeforeTest
    fun setup() {
        System.setProperty(UtilResources.getProperties("nameDriver"),
                UtilResources.getProperties("pathDriver") + UtilResources.getProperties("exeDriver"))
        driver = ChromeDriver()
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get("http://localhost:3000/?path=button")

    }

    @Test
    fun searchVideo() {

        val homePage = HomePage(driver!!)
        homePage.searchVideo(UtilResources.getProperties("nameVideo"))

        val resultPage = ResultPage(driver!!)
        Assert.assertTrue(resultPage.isPageOpened())

        resultPage.selectVideo(UtilResources.getProperties("selectVideo"))

        Assert.assertTrue(resultPage.playingVideo(UtilResources.getProperties("selectVideo"),
                UtilResources.getProperties("channel")))
    }

    @AfterTest
    fun driverClose() {
        driver.close();
    }

}