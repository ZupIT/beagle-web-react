package br.com.zup.z_example.webpages

import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory


class ResultPage(private val driver: WebDriver) {

    @FindBy(xpath = ".//*/li[1]/div/div[1]/div/p")
    private val numResult: WebElement? = null

    @FindBy(xpath = ".//*[@id='results']/ol/li/ol/li/div/div/div[2]/h3/a")
    private val videos: List<WebElement>? = null

    @FindBy(xpath = ".//*[@id='eow-title']")
    private val titleVideo: WebElement? = null

    @FindBy(xpath = ".//*[@id='watch7-user-header']/div/a")
    private val channel: WebElement? = null

    init {
        PageFactory.initElements(driver, this)
    }

    fun isPageOpened(): Boolean{
        return numResult?.text.toString().contains("About")
    }

    fun selectVideo(selectVideo: String){
        for (webElement in videos!!) {
            if (webElement.getText().contains(selectVideo)) {
                webElement.click()
                break
            }
        }
    }

    fun playingVideo(titleVideo: String, channel: String): Boolean{
        return titleVideo?.equals(titleVideo) && channel.equals(channel)
    }
}