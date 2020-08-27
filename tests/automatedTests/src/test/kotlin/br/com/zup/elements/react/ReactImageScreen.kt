package br.com.zup.elements.react

import br.com.zup.elements.ImageScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class ReactImageScreen(private val driver: WebDriver): ImageScreen {

    @FindBy(xpath = "/html/body/div/div/div/p[1]")
    override val imageText1: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/p[2]")
    override val imageText2: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/p[3]")
    override val imageText3: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/p[4]")
    override val imageText4: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/p[5]")
    override val imageText5: WebElement? = null


    init {
        PageFactory.initElements(driver, this)
    }
}