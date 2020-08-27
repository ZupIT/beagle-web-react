package br.com.zup.elements.react

import br.com.zup.elements.TouchableScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class ReactTouchableScreen(private val driver: WebDriver): TouchableScreen {

    @FindBy(xpath = "/html/body/div/div/div/div[1]/p")
    override val textWithTouchableText: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div[2]/p")
    override val imageWithTouchableText: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div[1]/div/p")
    override val clickHereTouchableText: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div[3]/p")
    override val networkImageWithTouchableText: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/p")
    override val actionClickText: WebElement? = null


    init {
        PageFactory.initElements(driver, this)
    }
}