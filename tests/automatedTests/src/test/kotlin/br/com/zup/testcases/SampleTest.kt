package br.com.zup.testcases

import br.com.zup.UtilResources
import br.com.zup.webpages.HomePage
import br.com.zup.webpages.ResultPage
import org.testng.Assert
import org.testng.annotations.Test

class SampleTest() : TestBase() {

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

}