package br.com.zup.elements.angular

import br.com.zup.elements.TabViewScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.PageFactory

class AngularTabViewScreen(private val driver: WebDriver): TabViewScreen {

    override val tab1Text: WebElement?
        get() = TODO("Not yet implemented")
    override val tab1Text2: WebElement?
        get() = TODO("Not yet implemented")
    override val tab1Text3: WebElement?
        get() = TODO("Not yet implemented")
    override val tab2Text: WebElement?
        get() = TODO("Not yet implemented")
    override val tab2Text2: WebElement?
        get() = TODO("Not yet implemented")
    override val tab2Text3: WebElement?
        get() = TODO("Not yet implemented")
    override val tab3Text: WebElement?
        get() = TODO("Not yet implemented")
    override val tab3Text2: WebElement?
        get() = TODO("Not yet implemented")
    override val tab3Text3: WebElement?
        get() = TODO("Not yet implemented")
    override val tab4Text: WebElement?
        get() = TODO("Not yet implemented")
    override val tab4Text2: WebElement?
        get() = TODO("Not yet implemented")
    override val tab4Text3: WebElement?
        get() = TODO("Not yet implemented")

    init {
        PageFactory.initElements(driver, this)
    }
}