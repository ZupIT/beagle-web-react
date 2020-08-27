package br.com.zup.elements.angular

import br.com.zup.elements.TouchableScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.PageFactory

class AngularTouchableScreen(private val driver: WebDriver): TouchableScreen {

    override val textWithTouchableText: WebElement?
        get() = TODO("Not yet implemented")
    override val imageWithTouchableText: WebElement?
        get() = TODO("Not yet implemented")
    override val clickHereTouchableText: WebElement?
        get() = TODO("Not yet implemented")
    override val networkImageWithTouchableText: WebElement?
        get() = TODO("Not yet implemented")
    override val actionClickText: WebElement?
        get() = TODO("Not yet implemented")

    init {
        PageFactory.initElements(driver, this)
    }
}